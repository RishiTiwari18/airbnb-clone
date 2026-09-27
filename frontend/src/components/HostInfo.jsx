function HostInfo({
  location,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  host,
  hostExperience,
}) {
  return (
    <>
      <div className="host-section">

        <div>
          <h2>
            Stay in {location}
          </h2>

          <p>
            {maxGuests} guests ·{" "}
            {bedrooms} bedrooms ·{" "}
            {beds} beds ·{" "}
            {bathrooms} bathroom
          </p>
        </div>

        <div className="host-avatar">
          {host.charAt(0)}
        </div>

      </div>

      <div className="host-info">

        <div className="host-avatar large">
          {host.charAt(0)}
        </div>

        <div>
          <h2>
            Hosted by {host}
          </h2>

          <p>
            {hostExperience}
          </p>
        </div>

      </div>
    </>
  );
}

export default HostInfo;