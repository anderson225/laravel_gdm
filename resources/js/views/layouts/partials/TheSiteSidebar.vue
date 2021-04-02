<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
            <div class="sidebar-brand-text mx-3">GESTION DE DISQUE</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
            <router-link class="nav-link" to="/admin">
                <i class="fas fa-fw fa-folder"></i>
                <span>Dashboard</span></router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            PRODUCTION
        </div>

        <!-- Categorie-->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
               aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-folder"></i>
                <span>Categorie</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link class="collapse-item" to="/admin/categorie/create">Créer</router-link>
                    <router-link class="collapse-item" to="/admin/categorie">Liste</router-link>
                </div>
            </div>
        </li>

        <!-- Réalisateurs -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
               aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-folder"></i>
                <span>Réalisateurs</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                 data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link class="collapse-item" to="/admin/realisateur/create">Créer</router-link>
                    <router-link class="collapse-item" to="/admin/realisateurs">Liste</router-link>
                </div>
            </div>
        </li>

        <!-- Rayons  -->
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
               aria-controls="collapsePages">
                <i class="fas fa-fw fa-folder"></i>
                <span>rayons</span>
            </a>
            <div id="collapsePages" class="collapse" aria-labelledby="headingPages"
                 data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link class="collapse-item" to="/admin/rayons/create">Créer</router-link>
                    <router-link class="collapse-item" to="/admin/rayons">Liste</router-link>
                </div>
            </div>
        </li>

        <!-- Disques  -->
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapseDisquePage" aria-expanded="true"
               aria-controls="collapseDisquePage">
                <i class="fas fa-fw fa-folder"></i>
                <span>Disques</span>
            </a>
            <div id="collapseDisquePage" class="collapse" aria-labelledby="headingPages"
                 data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link class="collapse-item" to="/admin/disque/create">Créer</router-link>
                    <router-link class="collapse-item" to="/admin/disques">Liste</router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->
</template>

<script>
export default {
    mounted() {
        !function (s) {
            "use strict";
            s("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
                s("body").toggleClass("sidebar-toggled"), s(".sidebar").toggleClass("toggled"), s(".sidebar").hasClass("toggled") && s(".sidebar .collapse").collapse("hide")
            }), s(window).resize(function () {
                s(window).width() < 768 && s(".sidebar .collapse").collapse("hide"), s(window).width() < 480 && !s(".sidebar").hasClass("toggled") && (s("body").addClass("sidebar-toggled"), s(".sidebar").addClass("toggled"), s(".sidebar .collapse").collapse("hide"))
            }), s("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (e) {
                if (768 < s(window).width()) {
                    var o = e.originalEvent, l = o.wheelDelta || -o.detail;
                    this.scrollTop += 30 * (l < 0 ? 1 : -1), e.preventDefault()
                }
            }), s(document).on("scroll", function () {
                100 < s(this).scrollTop() ? s(".scroll-to-top").fadeIn() : s(".scroll-to-top").fadeOut()
            }), s(document).on("click", "a.scroll-to-top", function (e) {
                var o = s(this);
                s("html, body").stop().animate({scrollTop: s(o.attr("href")).offset().top}, 1e3, "easeInOutExpo"), e.preventDefault()
            })
        }(jQuery);
    }
}
</script>
