if (localStorage.key("destination") !== null) {
  const destination = JSON.parse(localStorage.getItem("destination"));
  document.querySelector("input[name=country]").value = destination.country;
  document.querySelector("input[name=title]").value = destination.title;
  document.querySelector("input[name=link]").value = destination.link;

  document.querySelector("input[name=arrivalDate]").valueAsDate = formatDate(
    destination.arrivalDate,
  );
  document.querySelector("input[name=departureDate]").valueAsDate = formatDate(
    destination.departureDate,
  );
  document.querySelector("label[for=image]").remove();
  document.querySelector("input[name=image]").remove();
  
  document.querySelector("input[name=description]").value = destination.description;
}

function formatDate(stringDate) {
  const [day, month, year] = stringDate.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return date;
}

async function getDestinationFromForm() {
  const country = document.querySelector("input[name=country]").value;
  const title = document.querySelector("input[name=title]").value;
  const link = document.querySelector("input[name=link]").value;
  const arrivalDate = document.querySelector("input[name=arrivalDate]").value;
  const departureDate = document.querySelector("input[name=departureDate]").value;
  const description = document.querySelector("input[name=description]").value;


  const destination = {
    id: JSON.parse(localStorage.getItem("destination"))?.id,
    country: country,
    title: title,
    link: link,
    arrivalDate: arrivalDate,
    departureDate: departureDate,
    description: description,
  };

  if(localStorage.key("destination") === null) {
    const image = document.querySelector("input[name=image]").files[0];
    const byteArray = new Uint8Array(await image.arrayBuffer());

    destination.image = byteArray.reduce((result, byte) => {
      result.push(byte);
      return result;
    }, [])
  }; 

  return destination;
}

async function saveDestinationToServer(destination) {
  const res = await fetch("/api/destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });
  const data = await res.json();
}

async function updateDestinationToServer(destination) {
  const id = JSON.parse(localStorage.getItem("destination")).id;
  const res = await fetch(`/api/destinations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });

  const data = await res.json();
}

function redirectToDisplayDestinations() {
  location.href = "/";
}

const saveDestination = document.getElementById("saveDestination");

saveDestination.addEventListener("click", async (e) => {
  e.preventDefault();
  const destination = await getDestinationFromForm();

  await (localStorage.key("destination")
    ? updateDestinationToServer(destination)
    : saveDestinationToServer(destination));

  localStorage.removeItem("destination");  
  redirectToDisplayDestinations();
});
