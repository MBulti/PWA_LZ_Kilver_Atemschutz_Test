// offline data
db.enablePersistence()
    .catch(err => {
        if (err.code == "failed-precondition") {
            // multiple tabs open at once
            console.log("Persistence failed");
        } else if (err.code == "unimplemented") {
            // lack of browser support
            console.log("Persistence is not available");
        }
    });

// realtime listener
db.collection("entrys").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
            renderEntry(change.doc.data(), change.doc.id);
        }
        else if (change.type === "removed") {
            removeEntry(change.doc.id);
        }
    });
})

// add new entry
const form = document.querySelector("form");
form.addEventListener("submit", event => {
    event.preventDefault();

    const entry = {
        reason: form.reason.value,
        vehicle: form.vehicle.value,
        position: form.position.value,
    }
    db.collection("entrys").add(entry).catch(err => {
        console.log(err)
    })
    form.reset();
})

// delete entry
const entryContainer = document.querySelector(".entrys")
entryContainer.addEventListener("click", event => {
    if (event.target.nodeName === "I") {
        let id = event.target.getAttribute("data-id");
        db.collection("entrys").doc(id).delete();
    }
    // use this for detail page 
});