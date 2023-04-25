import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function Profile() {
  const [session, loading] = useSession();

  // If the user is not authenticated, redirect them to the login page
  if (!loading && !session) {
    router.push('/login');
    return null;
  }

  // If the session object is still loading, display a loading spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // Otherwise, make a request to the Discord API to get the user object
  const { accessToken } = session.user;
  const headers = { Authorization: `Bearer ${accessToken}` };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('https://discord.com/api/users/@me', { headers });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUser();

  // Render the profile page
  return (
    <div>
      <p>Logged in as {session.user.name}</p>
    </div>
  );
}
