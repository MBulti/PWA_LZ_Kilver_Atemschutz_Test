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
        pa: form.pa.value,
    }
    db.collection("entrys").add(entry).catch(err => {
        console.log(err)
    })

    form.reset();
})