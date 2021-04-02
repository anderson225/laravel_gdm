<template>
    <div>
        <h1 class="h5 mb-4 text-primary text-uppercase">Rayons</h1>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 text-primary text-uppercase">Liste des rayons</h6>
            </div>
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-sm-12">
                            <el-table ref="table" v-loading="isRequestOngoing" :data="rayons" stripe border fit
                                      style="width: 100%">
                                <el-table-column align="left" label="#ID" width="50">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.id">{{ scope.row.id }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="slug" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.slug }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="libellé" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.nom }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" width="150">
                                    <template slot-scope="scope">
                                        <router-link :to='{name:"categorie.edit",params:{id:scope.row.slug}}'>
                                            <el-button type="primary" size="small" icon="el-icon-edit">
                                                modifier
                                            </el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-button @click="deleteCat(scope.row.slug)" type="primary" size="small"
                                                   icon="el-icon-delete">
                                            supprimer
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

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
            isRequestOngoing: false,
            current_page: 1,
        }
    },
    mounted() {
        this.fetchData()

    },
    computed: {
        ...mapState('Rayons', ['rayons'])
    },
    methods: {
        ...mapActions('Rayons', ['FETCH_RAYONS']),
        async fetchData() {
            this.isRequestOngoing = true
            await this.FETCH_RAYONS()
            this.isRequestOngoing = false
        },
        handleCurrentChange(val) {
            this.current_page = val;
            this.fetchData()
        },
        async deleteCat(id) {
            let vm = this;
            this.$swal.fire({
                title: 'êtes-vous sûr de vouloir continuer?',
                text: "vous êtes sur le point de faire une suppresion definitive!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'oui'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.axios.delete(`/api/auth/rayon/${id}`).then(function (response) {
                        vm.fetchData()
                    })
                }
            })
        }
    }
}
</script>
