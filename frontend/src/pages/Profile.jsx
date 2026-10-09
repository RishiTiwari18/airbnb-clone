import { useAuth } from "../context/AuthContext";

function Profile() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <main>
        <h2>Loading profile...</h2>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <h2>User not found</h2>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <h2>{user.name}</h2>

        <p>
          Email: {user.email}
        </p>
      </div>
    </main>
  );
}

export default Profile;