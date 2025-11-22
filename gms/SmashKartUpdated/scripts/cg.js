'use strict';

let crazyGamesAuthListenerAdded;

function addCrazyGamesAuthListener()
{
  if (!crazyGamesAuthListenerAdded)
  {
    crazyGamesAuthListenerAdded = true;
    
    window.CrazyGames.SDK.user.addAuthListener((user) =>
    {
      if(window.unityGame != null)
      {
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnCrazyGamesUserLogin");
      }
    });
  }
}

function requestCrazyGamesUsername()
{
    if (window.CrazyGames.SDK.user.isUserAccountAvailable)
    {
        // call async function wrapper
        (async function ()
        {
            try
            {
                const user = await window.CrazyGames.SDK.user.getUser();

                console.log("CG: Username: ", user.username);

                //send complete message with username
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUsernameComplete", user.username);
            }
            catch (err)
            {
                console.log("CG: Error: ", err);

                //send complete message anyways with empty username
                window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUsernameComplete", "");
            }
        })();
    }
    else
    {
        console.log("CG: isUserAccountAvailable is false");

        //send complete message anyways with empty username
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUsernameComplete", "");
    }
}

function requestCrazyGamesUserToken()
{
  if (window.CrazyGames.SDK.user.isUserAccountAvailable)
  {
    // call async function wrapper
    (async function ()
    {
      try
      {
        const token = await window.CrazyGames.SDK.user.getUserToken();

        // console.log("CG: Token: ", token);

        //send complete message with token
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUserTokenComplete", token);
      }
      catch (err)
      {
        console.log("CG: Error: ", err);

        //send complete message anyways with empty token
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUserTokenComplete", "");
      }
    })();
  }
  else
  {
    console.log("CG: isUserAccountAvailable is false");

    //send complete message anyways with empty token
    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRequestCrazyGamesUserTokenComplete", "");
  }
}

async function showCrazyGamesAccountLinkPrompt()
{
  try
  {
    const response = await window.CrazyGames.SDK.user.showAccountLinkPrompt();
    console.log("CG: Link account response", response);

    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnCrazyGamesShowAccountLinkPromptComplete", JSON.stringify(response));
  }
  catch (e)
  {
    console.log("CG Link account error:", e);

    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnCrazyGamesShowAccountLinkPromptComplete", JSON.stringify(e));
  }
}

async function showCrazyGamesAuthPrompt()
{
  try
  {
    const user = await window.CrazyGames.SDK.user.showAuthPrompt();
    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnCrazyGamesShowAuthPromptComplete", "");
  }
  catch (e)
  {
    console.log("CG Show auth prompt error:", e);

    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnCrazyGamesShowAuthPromptComplete", JSON.stringify(e));
  }
}

function isCrazyGamesInstantMultiplayer()
{
    return window.CrazyGames.SDK.game.isInstantMultiplayer;
}
