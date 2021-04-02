<template>
    <div>
        <h1 class="h5 mb-4 text-primary text-uppercase">Disques</h1>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 text-primary text-uppercase">Liste des disques</h6>
            </div>
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-sm-12">
                            <el-table ref="table" v-loading="isRequestOngoing" :data="disques" stripe border fit
                                      style="width: 100%">
                                <el-table-column align="left" label="#ID" width="50">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.id">{{ scope.row.id }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="nom" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.nom }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="image" min-width="80">
                                    <template slot-scope="scope">
                                        <span><img :src="scope.row.img" :alt="scope.row.nom" width="150"></span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="categorie" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.categorie.nom }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="realisateur" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.realisateur.name }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="left" label="date de sortie" min-width="80">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.date_sortie }}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" width="150">
                                    <template slot-scope="scope">
                                        <router-link :to='{name:"disque.edit",params:{id:scope.row.slug}}'>
                                            <el-button type="primary" size="small" icon="el-icon-edit">
                                                modifier
                                            </el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-button @click="deleteDisque(scope.row.slug)" type="primary"
                                                   size="small"
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
        ...mapState('Disques', ['disques'])
    },
    methods: {
        ...mapActions('Disques', ['FETCH_DISQUES']),
        async fetchData() {
            this.isRequestOngoing = true
            await this.FETCH_DISQUES()
            this.isRequestOngoing = false
        },
        handleCurrentChange(val) {
            this.current_page = val;
            this.fetchData()
        },
        async deleteDisque(id) {
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
                    window.axios.delete(`/api/auth/disque/${id}`).then(function (response) {
                        vm.fetchData()
                    })
                }
            })
        }
    }
}
</script>
