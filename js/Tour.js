

AFRAME.registerComponent("tour", {
  schema:{
    state:{type:"string",default:"places-list"},
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function() {
    this.placesContainer = this.el
    this.createCards()
  },
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  showView: function () {
    const { selectedCard } = this.data;

    //Set the 360 degree image to the sky element.
    const skyEl = document.querySelector("#main-container");

    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "white"
    });
  },

  createCards: function() {
    const thumbnails = [
      {
        name: "Budapest",
        asset: "./assets/thumbnails/budapest.jpg",
        id: "budapest"
      },
      {
        name: "Eiffel Tower",
        asset: "./assets/thumbnails/eiffel_tower.jpg",
        id: "eiffel_tower"
      },
      {
        name: "Taj Mahal",
        asset: "./assets/thumbnails/taj_mahal.png",
        id: "taj_mahal"
      },
      {
        name: "New York City",
        asset: "./assets/thumbnails/new_york_city.png",
        id: "new_york_city"
      },
    ]

    let prevX = -60

    for (const thumb of thumbnails) {
      const posX = prevX + 25
      const posY = 10
      const posZ = -40

      const pos = { x: posX, y: posY, z: posZ }

      prevX = posX

      const border = this.createBorder(pos, thumb.id)
      const thumbnail = this.createThumbnail(thumb)
      const title = this.createTitle(pos, thumb)

      border.appendChild(thumbnail)
      border.appendChild(title)

      this.placesContainer.appendChild(border)

    }
  },
  createBorder: function(pos, id) {
    const ent = document.createElement("a-entity")
    ent.setAttribute("id", id)
    ent.setAttribute("visible", true)
    ent.setAttribute("geometry", { primitive: "ring", radiusInner: 9, radiusOuter: 10 })
   
    ent.setAttribute("position", pos)
    ent.setAttribute("material", { color: "red", opacity: 0.4 })
    ent.setAttribute("cursor-events", {})
    return ent
  },
  createThumbnail: function(item) {
    const ent = document.createElement("a-entity")
    ent.setAttribute("visible", true)
    ent.setAttribute("geometry", { primitive: "circle", radius: 9 })
    ent.setAttribute("material", { src: item.asset })
    return ent
  },
  createTitle: function(pos, item) {
    const ent = document.createElement("a-entity")
    ent.setAttribute("text", { font: "exo2bold", align: "center", width: 70, color: "black", value: item.name })
    const eltPos = pos
    eltPos.y = -20
    ent.setAttribute("position", eltPos)
    ent.setAttribute("visible", true)
    return ent
  }

})