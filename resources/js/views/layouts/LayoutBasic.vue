<template>
    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <site-sidebar/>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <site-header></site-header>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <router-view/>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->
</template>

<script type="text/babel">
import SiteHeader from './partials/TheSiteHeader.vue'
import SiteSidebar from './partials/TheSiteSidebar.vue'

export default {
    components: {
        SiteHeader,
        SiteSidebar
    }
}
</script>

<style scoped>
@import '../../assets/css/sb-admin-2.min.css';
</style>
