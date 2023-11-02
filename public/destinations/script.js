(async () => {
  const formatter = new Intl.DateTimeFormat(undefined);
  const render = (destination) => {
    console.log(destination);
    return `
<div id="${destination._id}" class="travelcard">
  <div class="div1">
    <div class="divimg">
      <img class="imageUrl" src="${destination.imageUrl}" alt="" />
    </div>
    <div>
      <div class="location">
        <img src="/images/location.png" alt="" />
        <div class="country">${destination.country}</div>
        <div class="map-link">
          <a
            class="link"
            href="${destination.link}"
            >View on Google Maps</a
          >
        </div>
      </div>

      <div class="title">${destination.title}</div>
      <div class="date">${formatter.format(new Date(destination.arrivalDate))} - ${formatter.format(new Date(destination.departureDate))}</div>
      <div class="description">${destination.description}</div>
    </div>
  </div>
  <div class="div2">
    <button class="deleteButton"><p>Delete</p></button>
    <a href="/destinations/create/index.html"
      ><button class="updateButton"><p>Update</p></button></a
    >
  </div>
</div>
<hr class="hr-main" />
`;
  };

  const container = document.querySelector("div.travelcolumn");
  const response = await fetch("/api/destinations");
  const result = await response.json();
  container.innerHTML = result.map(render).join("");

  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this destination?")) {
        const card = document.querySelector(".travelcard");
        const id = card.id;
        const response = await fetch(`/api/destinations/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
      }
      window.location.reload();
    });
  });

  document.querySelectorAll(".updateButton").forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest(".travelcard");
      const id = document.querySelector(".travelcard").id;

      const destination = {
        id: id,
        country: card.querySelector(".country").textContent,
        title: card.querySelector(".title").textContent,
        link: card.querySelector(".link").href,
        arrivalDate: card.querySelector(".date").textContent.split(" - ")[0],
        departureDate: card.querySelector(".date").textContent.split(" - ")[1],
        imageUrl: card.querySelector(".imageUrl").src,
        description: card.querySelector(".description").textContent,
      };

      localStorage.setItem("destination", JSON.stringify(destination));
    });
  });
})();
