import { getSession } from "next-auth/react";

async function Discord (req, res){
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  
  const { refreshToken } = session.user;

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    res.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
    });
  } else {
    res.status(response.status).end();
  }
};

export default Discord