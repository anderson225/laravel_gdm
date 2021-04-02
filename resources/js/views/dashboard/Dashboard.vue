<template>
    <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                disques
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{disque}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-compact-disc fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                realisateurs
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{realisateur}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Categorie
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{categorie}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data() {
        return {
            categorie: 0,
            disque: 0,
            realisateur: 0,
            isRequestOngoing: false,
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.isRequestOngoing = true
            let vm = this
            window.axios.get(`/api/stat/`).then(function (response) {
                vm.categorie = response.data.categories
                vm.disque = response.data.disques
                vm.realisateur = response.data.realisateurs
            }).catch(error => {
                console.log(error)
            })
            this.isRequestOngoing = false
        }
    }
}
</script>
