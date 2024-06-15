document.getElementById("fetchData").addEventListener("click", result);

async function result() {
    try {
        var category = document.getElementById("text").value;
        var response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`);
        var res = await response.json();
        console.log(res);

        var container = document.getElementById("results");
        container.innerHTML = "";  // Clear previous results

        if (res.data && res.data.length > 0) {
            var row = document.createElement("div");
            row.className = "row";

            res.data.forEach(entry => {
                var col = document.createElement("div");
                col.className = "col-lg-4 mb-4";
                col.innerHTML = `
                    <div class="card border-primary">
                    <img src="${entry.image}" class="card-img-top" alt="${entry.name}">
                        <div class="card-header">${entry.category}</div>
                        <div class="card-body text-primary">
                            <h5 class="card-title">${entry.name}</h5>
                            <p class="card-text">${entry.description}</p>
                        </div>
                    </div>`;
                row.appendChild(col);
            });

            container.appendChild(row);
        } else {
            var message = document.createElement("div");
            message.className = "alert alert-danger";
            message.textContent = "No entries found for this category.";
            container.appendChild(message);
        }
    } catch (error) {
        console.log(error);
        var container = document.getElementById("results");
        container.innerHTML = "";
        var message = document.createElement("div");
        message.className = "alert alert-danger";
        message.textContent = "Failed to fetch data. Please check the category and try again.";
        container.appendChild(message);
    }
}
