function selectGear(gear) {

    document.getElementById("gearSelect").value = gear;

    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}


document.getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const gear =
            document.getElementById("gearSelect").value;

        const start =
            document.getElementById("startDate").value;

        const end =
            document.getElementById("endDate").value;

        const message =
            document.getElementById("message").value;


        const whatsapp =
            "919381347090";


        const text =

`Hello CAMP OUT 👋

I want to rent camping equipment.

Name: ${name}

Mobile: ${phone}

Equipment: ${gear}

Start Date: ${start}

End Date: ${end}

Requirements:
${message}

Please confirm availability and rental price.`;


        const url =
            "https://wa.me/" +
            whatsapp +
            "?text=" +
            encodeURIComponent(text);


        window.open(url, "_blank");

    });