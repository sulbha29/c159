AFRAME.registerComponent("cursor-events", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function() {
    this.handleMouseEnter()
    this.handleMouseLeaveEvents()
    this.handleClickEvents()
  },
  handlePlacesState: function() {
    const id = this.el.getAttribute("id")
    console.log(id)
    const placesId = ["taj_mahal", "budapest", "new_york_city", "eiffel_tower"]
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container")
      placeContainer.setAttribute("cursor-events", { selectedItemId: id })
      this.el.setAttribute("material", { color: "green", opacity: 1 })
    }
    
  },
  handleClickEvents: function () {
    //Cursor 'click' Events
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "taj_mahal",
          "budapest",
          "new_york_city",
          "eiffel_tower"
        ];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id
          });
        }
      }
    });
  },
  handleMouseEnter:function() {
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesState()
    })
  },
  handleMouseLeaveEvents: function () {
    //Cursor 'mouseleave' Events
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("material", {
            color: "pink",
            opacity: 1,
          });
        }
  }
})
  }
})