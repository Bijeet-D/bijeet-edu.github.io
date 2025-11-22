'use strict';

var unityFirebaseGameOjbectName = 'JavascriptMessageReceiver';

var firstLoad = true;

function onAuthStateChanged(user) {
  if(!user)
  {
    if(firstLoad)
    {
      if(window.customAuthToken != null)
      {
        signInWithCustomToken(window.customAuthToken);
      }
      else
      {
        signInAnonymously();
      }
    }
  }
  else
  {
    getUserNoAdsEndTimestamp();
    sendAuthDataToUnity();
  }
  firstLoad = false;
}

function signInWithCustomToken(token)
{
    let prevUid = getCurrentUserId();
    
    firebase.auth().signInWithCustomToken(token).then((userCredential) =>
    {
        console.log("signInWithCustomToken Success");

        //if the user id doesnt change when signing in we need to trigger an update on the C# side by sending the auth data back to unity
        if (prevUid === getCurrentUserId())
        {
            sendAuthDataToUnity();
        }
    }).catch(function (error)
    {
        console.log("error logging in " + error.code);
        console.error(error);

        //create json object with error code and description
        //to parse it into firebaseSignInWithEmailFailed()
        let jsonObject = {
            errorCode : error.code,
            errorMessage : error.message,
        };
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", JSON.stringify(jsonObject));
    });
}

function signInAnonymously()
{
    firebase.auth().signInAnonymously().catch(function(error) {
        var errorCode = error.code;
        console.log("error logging in " + errorCode);
        console.error(error);
    });
}

function signInWithCrazyGames()
{
    if (window.CrazyGames.SDK.user.isUserAccountAvailable)
    {
        // call async function wrapper
        (async function ()
        {
            try
            {
                const token = await window.CrazyGames.SDK.user.getUserToken();

                const jsonDataStr = JSON.stringify({
                    "cgUserToken": token
                });

                callCloudFunction("signInWithCrazyGames", jsonDataStr, `signInWithCrazyGames_${Date.now()}`, (gameResponse) =>
                {
                    //success
                    signInWithCustomToken(gameResponse.data.customToken);

                }, (errMsg) =>
                {
                    //error
                    console.error(`signInWithCrazyGames error: ${errMsg}`);
                });
            }
            catch (err)
            {
                console.log("Caught signInWithCrazyGames error: ", err);
            }
        })();
    }
    else
    {
        const errMsg = "CG: isUserAccountAvailable is false";
        console.log(errMsg);
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", errMsg);
    }
}

function signInWithEmail(email, password)
{
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) =>
    {
        console.log("signInWithEmailAndPassword Success");
    }).catch(function (error)
    {
        console.log("error logging in " + error.code);
        console.error(error);

        //create json object with error code and description
        //to parse it into firebaseSignInWithEmailFailed()
        let jsonObject = {
            errorCode : error.code,
            errorMessage : error.message,
        };
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", JSON.stringify(jsonObject));
    });
}
function linkUserWithEmail(email, password)
{
    if (firebase.auth().currentUser != null)
    {
        let linkingToExisting = false;
        if (!firebase.auth().currentUser.isAnonymous)
        {
            linkingToExisting = true;
        }

        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        firebase.auth().currentUser.linkWithCredential(credential).then(function (user) {
            if (linkingToExisting) {
                console.log("Linked email to account successfully", user);
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkNewEmailSuccess");
            }
            else {
                console.log("Anonymous account successfully upgraded", user);
            }
            sendAuthDataToUnity();

        }, function (error) {
            console.log("Error upgrading anonymous account", error);
            console.error(error);

            let jsonObject = {
                errorCode : error.code,
                errorMessage : error.message,
            };

            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", JSON.stringify(jsonObject));
        });
    }
}

// Used for updating your current email
function changeEmailLogin(currentEmail, newEmail) {

    if (firebase.auth().currentUser != null)
    {
        firebase.auth().currentUser.updateEmail(newEmail).then(() => {

            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseChangeEmailLoginSuccess", newEmail);
        }).catch((error) => {
            let jsonObject = {
                errorCode : error.code,
                errorMessage : error.message,
            };
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseChangeUserEmailFailed",  JSON.stringify(jsonObject));
            console.log('Error updating email:', error);
        });

    }
    else{
        console.log("firebase auth's current user does not exist!");
    }
}

//@podonnell: Turn off linkWithRedirect for mobile etc. as this was previously only being used because linkWithPopup was causing issues
//These seem to have been fixed at some stage probably some upgrade of firebase
// function checkForRedirect()
// {
//   firebase.auth().getRedirectResult().then(function(result)
//   {
//     console.log("linkOrSignInWithGoogle:success");
//     sendAuthDataToUnity();
//   }, function(error)
//   {
//     if(error.code == "auth/credential-already-in-use")
//     {
//       console.log("linkOrSignInWithGoogle:fail auth/credential-already-in-use try signInWithCredential");
//       firebase.auth().signInWithCredential(error.credential).catch(function(error)
//       {
//         console.log("signInWithCredential:: Error logging in " + error.code);
//         console.error(error);
//         window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
//       });
//     }
//     else
//     {
//       console.log("linkOrSignInWithGoogle:: Error logging in " + error.code);
//       console.error(error);
//       window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", error.message);
//     }
//   });
// }

function linkOrSignInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    if (firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous) {
        //@podonnell: Turn off linkWithRedirect for mobile etc. as this was previously only being used because linkWithPopup was causing issues
        //These seem to have been fixed at some stage probably some upgrade of firebase
        // var isSafariBrowser = (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1);
        // if(isMobile() || isSafariBrowser)
        // {
        //   firebase.auth().currentUser.linkWithRedirect(provider);
        // }
        // else
        {
            firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
                console.log("linkOrSignInWithGoogle:: Success");
                sendAuthDataToUnity();
            }).catch((error) => {

                let jsonObject = {
                    errorCode : error.code,
                    errorMessage : error.message,
                };

                if (error.code == "auth/credential-already-in-use") {
                    firebase.auth().signInWithCredential(error.credential).catch(function (error) {
                        console.log("signInWithCredential:: Error logging in " + error.code);
                        console.error(error);

                        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", JSON.stringify(jsonObject));
                    });
                }
                else {
                    console.log("linkOrSignInWithGoogle:: Error logging in " + error.code);
                    console.error(error);
                    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", JSON.stringify(jsonObject));
                }
            });
        }
    }
}

function linkOrSignInWithApple() {
    var provider = new firebase.auth.OAuthProvider('apple.com');

    if (firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous) {
        //@podonnell: Turn off linkWithRedirect for mobile etc. as this was previously only being used because linkWithPopup was causing issues
        //These seem to have been fixed at some stage probably some upgrade of firebase
        // var isSafariBrowser = (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1);
        // if(isMobile() || isSafariBrowser)
        // {
        //   firebase.auth().currentUser.linkWithRedirect(provider);
        // }
        // else
        {
            firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
                console.log("linkOrSignInWithApple:: Success");
                sendAuthDataToUnity();
            }).catch((error) => {

                let jsonObject = {
                    errorCode : error.code,
                    errorMessage : error.message,
                };

                if (error.code == "auth/credential-already-in-use") {
                    firebase.auth().signInWithCredential(error.credential).catch(function (error) {
                        console.log("signInWithCredential:: Error logging in " + error.code);
                        console.error(error);
                        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", JSON.stringify(jsonObject));
                    });
                }
                else {
                    console.log("linkOrSignInWithApple:: Error logging in " + error.code);
                    console.error(error);
                    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", JSON.stringify(jsonObject));
                }
            });
        }
    }
}

let addedDiscordMessageListener = false;

function linkOrSignInWithDiscord(scope)
{
    if (firebase.auth().currentUser != null)
    {
        const popup = window.open(
            `${discordLoginRedirectUrl}?origin=${window.location.origin}&scope=${scope}`,
            'DiscordLogin',
            'width==1000,height=760'
        );

        if (!popup)
        {
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", "popup blocked");
            return;
        }

        // Start monitoring the popup for closure
        const popupClosedInterval = setInterval(() =>
        {
            if (popup.closed)
            {
                clearInterval(popupClosedInterval);
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", "User closed the popup or cancelled login");
            }
        }, 20000);

        if (!addedDiscordMessageListener)
        {
            addedDiscordMessageListener = true;

            // Listen for a message from the popup
            window.addEventListener('message', async (event) =>
            {
                const tempUrl = new URL(discordLoginRedirectUrl);

                if (event.origin === tempUrl.origin && event.data && typeof event.data === 'object' && 'discordLoginCode' in event.data)
                {
                    clearInterval(popupClosedInterval);

                    const jsonDataStr = JSON.stringify({
                        "code": event.data.discordLoginCode,
                        "redirect_uri": discordLoginRedirectUrl
                    });

                    callCloudFunction("discordSignIn", jsonDataStr, `discordSignIn_${Date.now()}`, (gameResponse) =>
                    {
                        //success
                        const customToken = gameResponse.data["customToken"];

                        if (customToken)
                        {
                            signInWithCustomToken(customToken);
                        }
                        else
                        {
                            console.error(`linkOrSignInWithDiscord customToken not found`);
                        }

                    }, (errMsg) =>
                    {
                        //error
                        console.error(`linkOrSignInWithDiscord error: ${errMsg}`);
                    });
                }
            });
        }
    }
}

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log("signOut:: Success");
        signInAnonymously();
    }).catch(function (error) {
        console.log("signOut:: Failed ");
        console.error(error);
    });
}

function sendAuthDataToUnity() {
    if (window.unityGame != null && firebase.auth().currentUser != null) {
        var firebaseUid = firebase.auth().currentUser.uid;
        var isAnon = firebase.auth().currentUser.isAnonymous;
        var data = { authToken: "", uid: firebaseUid, isAnonymous: isAnon };
        var dataJson = JSON.stringify(data);
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, 'SetAuthToken', dataJson);
    }
}

function sendPasswordResetEmail(emailAddress) {
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
        console.log("sendPasswordResetEmail:: Success");
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "SendPasswordResetEmailSuccess");
    }).catch(function (error) {
        console.log("sendPasswordResetEmail:: Failed ");
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "SendPasswordResetEmailFailed", error.message);
        console.error(error);
    });
}

// cache the nodeKeys for UD and UDRO the first time they are loaded
// use this to limit retry attempts to reload when it fails due to race condition
let firstLoadFailUD;
let firstLoadFailUDRO;

function getValueTT(nodeKey) {
    const RETRY_DELAY_MS = 1000;
    const dbRef = firebase.database().ref();
    dbRef.child(nodeKey).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            var valJsonStr = JSON.stringify(snapshot.val());
            SendDataToUnity("OnGetValueSuccess", nodeKey, valJsonStr);
        } else {
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnGetValueEmptySuccess", nodeKey);
        }
    }).catch((error) => {
        SendDataToUnity(unityFirebaseGameOjbectName, "OnGetValueError", nodeKey, error.message);
        console.error(error);

        // Retry only on specific transient error
        if (error.code === "PERMISSION_DENIED" || error.message.includes("permission_denied")) {
            // failed to get a value with permission denied error, this may be hacking, or it could be the first time loading hang bug.
            // in that case we want to retry the load once, but only for ud and udro nodes, to do this we will cache the node keys for them separately, if they are yet undefined, we will retry once.
            const platform = isMobile() ? "mobile" : "desktop";
            const portal = (window.location != window.parent.location ? document.referrer : document.location.href);
            const url = new URL(portal);
            const domain = url.hostname;
            const prunedDomain = domain.replace(/\./g, "-");
            const fullPlatform = prunedDomain + "-" + platform;

            const isUD = nodeKey.startsWith("users/") && nodeKey.endsWith("/ud");
            const isUDRO = nodeKey.startsWith("users/") && nodeKey.endsWith("/udro");

            let shouldRetry = false;

            if (isUD) {
                if (!firstLoadFailUD) {
                    firstLoadFailUD = nodeKey;
                    shouldRetry = true;
                }
            } else if (isUDRO) {
                if (!firstLoadFailUDRO) {
                    firstLoadFailUDRO = nodeKey;
                    shouldRetry = true;
                }
            }
            if (shouldRetry) {
                setTimeout(() => getValueTT(nodeKey), RETRY_DELAY_MS);
                return;
            }
        }
    });
}

function SendDataToUnity(functionName, nk, ds) {
    var obj =
        {
            nodeKey: nk,
            dataStr: ds
        }

    window.unityGame.SendMessage(unityFirebaseGameOjbectName, functionName, JSON.stringify(obj));
}


function SendResponseToUnity(functionName, k, responseData) {
    responseData["key"] = k;

    window.unityGame.SendMessage(unityFirebaseGameOjbectName, functionName, JSON.stringify(responseData));
}

function setValueTT(nodeKey, jsonData) {
    if (firebase.auth().currentUser != null) {
        const dbRef = firebase.database().ref();
        var jsonObj = JSON.parse(jsonData);
        dbRef.child(nodeKey).set(jsonObj, (error) => {
            if (error) {
                console.log("auth.js::setValue - Error " + nodeKey);
                SendDataToUnity("OnSetValueError", nodeKey, error.message);
            } else {
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnSetValueSuccess", nodeKey);
            }
        });
    }
}

function removeValueTT(nodeKey) {
    if (firebase.auth().currentUser != null) {
        const dbRef = firebase.database().ref();
        dbRef.child(nodeKey).remove()
            .then(function () {
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRemoveValueSuccess", nodeKey);
            })
            .catch(function (error) {
                console.log("auth.js::removeValueTT error");
                SendDataToUnity("OnRemoveValueError", nodeKey, error.message);
            });
    }
}

function updateValueTT(nodeKey, jsonData) {
    if (firebase.auth().currentUser != null) {
        const dbRef = firebase.database().ref();
        var jsonObj = JSON.parse(jsonData);
        dbRef.child(nodeKey).update(jsonObj, (error) => {
            if (error) {
                console.log("auth.js::updateValue Error " + nodeKey);
                SendDataToUnity("OnUpdateValueError", nodeKey, error.message);
            } else {
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnUpdateValueSuccess", nodeKey);
            }
        });
    }
}

var cloudFunctionSuccess = 0;
var cloudFunctionFail = 0;

var regions = ["us-central1", "us-east1", "europe-west1"];
var lastError = "internal";

async function callCloudFunction(functionId, jsonData, key, onSuccess, onError, sendResponseToUnity = true) {
    var success = false;
    for (var i = 0; i < regions.length; i++) {
        success = await callCloudFunctionNew(functionId, jsonData, key, regions[i], i, onSuccess, onError, sendResponseToUnity);
        if (success) {
            break;
        }
    }

    if (!success && sendResponseToUnity) {
        SendDataToUnity("OnFunctionError", key, lastError);
    }
}

async function callCloudFunctionNew(functionId, jsonData, key, region, count, onSuccess, onError, sendResponseToUnity = true) {
    if (firebase.auth().currentUser != null) {
        try {
            const dataObject = JSON.parse(jsonData);
            var functionRef = firebase.app().functions(region).httpsCallable(functionId + "Multi");

            var fbResponse = await functionRef(dataObject);
            if (fbResponse != null) {
                var gameResponse = fbResponse.data;

                if (gameResponse != null) {
                    cloudFunctionSuccess++;

                    if (sendResponseToUnity) {
                        SendResponseToUnity("OnFunctionComplete", key, gameResponse);
                    }

                    if (!gameResponse.result) {
                        if (typeof onError === 'function') {
                            onError(gameResponse.message);
                        }

                        logCloudFunctionError("v5-" + count + "-f", jsonData, gameResponse.debugMessage, functionId);
                    }
                    else if (typeof onSuccess === 'function') {
                        onSuccess(gameResponse);
                    }

                    return true;
                }
                else {
                    if (typeof onError === 'function') {
                        onError("null game response");
                    }
                    logCloudFunctionError("v5-" + count + "-r", "null game response", functionId);
                    return false;
                }
            }
            else {
                if (typeof onError === 'function') {
                    onError("null FB response");
                }
                logCloudFunctionError("v5-" + count + "-n", jsonData, "null FB response", functionId);
                return false;
            }
        }
        catch (error) {
            cloudFunctionFail++;
            if (typeof onError === 'function') {
                onError(error.message);
            }
            logCloudFunctionError("v5-" + count + "-e", jsonData, error.message, functionId);
            lastError = error.message;
            return false;
        }
    }
}

const logCloudFunctionErrors = false;
function logCloudFunctionError(debugErrorRootNode, jsonData, message, functionId) {
    if (logCloudFunctionErrors) {
        var firebaseUid = firebase.auth().currentUser.uid;
        var currentTime = new Date().getTime();
        var debugErrorNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime;
        const dbRef = firebase.database().ref();
        dbRef.child(debugErrorNode).set({
            errorData: jsonData,
            os: getOS(),
            time: currentTime,
            successCount: cloudFunctionSuccess,
            failCound: cloudFunctionFail,
            errorMessage: message
        }, (setValueError) => {
            if (setValueError) {
                console.log("logCloudFunctionError setValueError:: " + setValueError.message);
            } else {
                var debugErrorWriteSuccessNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime + "/successTime";
                var successTime = new Date().getTime();
                dbRef.child(debugErrorWriteSuccessNode).set(successTime);
                //console.log("logCloudFunctionError Success");
            }
        });
    }
    else {
        console.log("logCloudFunctionError:: " + debugErrorRootNode + " " + message);
    }
}

function logCloudFunctionSuccess(debugErrorRootNode, jsonData, functionId) {
    var firebaseUid = firebase.auth().currentUser.uid;
    var currentTime = new Date().getTime();
    var debugErrorNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime;
    const dbRef = firebase.database().ref();

    dbRef.child(debugErrorNode).set({
            errorData: jsonData,
            os: getOS(),
            time: currentTime,
            successCount: cloudFunctionSuccess,
            failCount: cloudFunctionFail,
        }, (setValueError) => {
            if (setValueError) {
                console.log("logCloudFunctionSuccess setValueError:: " + setValueError.message);

            } else {
                console.log("logCloudFunctionSuccess Success ");
            }
        }
    );
}

function getCurrentUserId() {
    if (firebase.auth().currentUser != null) {
        return firebase.auth().currentUser.uid;
    }
    return "";
}

function getCurrentUserIsAnon() {
    if (firebase.auth().currentUser != null) {
        return firebase.auth().currentUser.isAnonymous;
    }
    return true;
}

function getUserEmail() {
    if (firebase.auth().currentUser != null) {
        return firebase.auth().currentUser.email;
    }
    return "";
}

function getUserProvider() {
    const user = firebase.auth().currentUser;

    if (user && Array.isArray(user.providerData) && user.providerData.length > 0) {
        return user.providerData[user.providerData.length - 1].providerId;
    }

    return ""; // anonymous or not a default provider (Discord, CrazyGames)
}

var userNoAdsEndTimestamp;
function getUserNoAdsEndTimestamp() {
    if (typeof firebase !== 'undefined' && firebase.database() != null && firebase.auth() != null) {
        try {
            var uid = getCurrentUserId();

            if (uid != null && uid !== "") {
                const dbRef = firebase.database().ref();

                dbRef.child(`users/${uid}/udro/noAdsEndTimestamp`).once("value").then((snapshot) => {
                    if (snapshot.exists()) {
                        userNoAdsEndTimestamp = snapshot.val();
                    }
                    else {
                        userNoAdsEndTimestamp = 0;
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

window.addEventListener('load', function () {
    console.log('Init Auth');
    if (typeof firebase !== 'undefined' && firebase.auth() != null) {
        firebase.auth().onAuthStateChanged(onAuthStateChanged);

        //@podonnell: Turn off linkWithRedirect for mobile etc. as this was previously only being used because linkWithPopup was causing issues
        //These seem to have been fixed at some stage probably some upgrade of firebase
        //checkForRedirect();
    }
}, false);


function getBrowser() {
    return window.navigator.userAgent;
}

function getBrowserVisibilityState()
{
    return document.visibilityState;
}

function getUserProviders()
{
    const user = firebase.auth().currentUser;

    let providers = "";

    if (user)
    {
        providers = user.providerData.map(p => p.providerId).join("-"); //wont include custom auth eg discord or cg
    }

    console.log(`getUserProviders: ${providers}`);

    return providers;
}
