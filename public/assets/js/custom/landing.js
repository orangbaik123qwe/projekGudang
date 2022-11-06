"use strict";

// Class definition
// var avatar3 = new KTImageInput('kt_image_3');
var KTLandingPage = (function () {
    // Private methods
    var initTyped = function () {
        var typed = new Typed("#kt_landing_hero_text", {
            strings: [
                "The Best Theme Ever",
                "The Most Trusted Theme",
                "#1 Selling Theme",
            ],
            typeSpeed: 50,
        });
    };

    // Public methods
    return {
        init: function () {
            //initTyped();
        },
    };
})();

// Webpack support
if (typeof module !== "undefined") {
    module.exports = KTLandingPage;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTLandingPage.init();
});


$(document).ready(function () {

    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<div style='border-radius:50%' class='d-flex align-items-center justify-content-center nav-button owl-prev'><i class='fa fa-chevron-left text-dark'></i></div>", "<div style='border-radius:50%' class=' d-flex align-items-center justify-content-center nav-button owl-next'><i class='fa fa-chevron-right text-dark'></i></div>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            // 1000: {
            //     items: 5,
            // },
        },
    });

})
$(document).ready(function () {
    $('#kirim-notif').hide();

})

function showModalNotif() {
    // alert();
    $('#kirim-notif').modal('show');
    // $('#kirim-notif').show();
}

function openTabs(evt, tabsName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabsName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showButton(el) {
    document.getElementById(el).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn-' + el)) {
        var dropdowns = document.getElementsByClassName("dropdown-content-" + el);
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-' + el)) {
                openDropdown.classList.remove('show-' + el);
            }
        }
    }
}

function addRow(){
    var html = `<div class="col-md-9">
                    <div class=" mt-8 form-group row">
                        <label class="fw-bold" for="email">Kategori</label>
                        <select class="form-control mt-3">
                            <option>Ahli Bangunan</option>
                            <option>Ahli Arsitektur</option>
                        </select>
                        <div id="error_code" style="font-size : 10px; color: #DC3545;"></div>
                    </div>
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                    <div class="col-md-10  mt-8 form-group row">
                        <label class="fw-bold " for="desc">Kuantitas</label>
                        <select class="form-control mt-3">
                            <option>1</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <div id="error_code" style="font-size : 10px; color: #DC3545;"></div>
                    </div>
                </div>`;
    $('#form_kebutuhan').append(html);
}