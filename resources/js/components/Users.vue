<template>
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Users</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newAction()">Add User <i class="fas fa-user-plus"></i></button>
                </div>
            </div>
            <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>

                        <tr v-for="user in users.data" :key="user.id">
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.type | upText}}</td>
                            <td>{{user.created_at | myDate}}</td>
                            <td>
                                <a href="#" @click="editAction(user)">
                                    <i class="list-action-icon fas fa-edit"></i>
                                </a>
                                <a href="#" @click="deleteAction(user.id)">
                                    <i class="list-action-icon fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>

                    </tbody>
            </table>
            </div>

            <!--Data Tables Users-->
            
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ? updateAction() : createAction()" >
                        <div class="modal-body">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input v-model="form.name" type="text" name="name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Name">
                                    <has-error :form="form" field="name"></has-error>
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input v-model="form.email" type="email" name="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Email">
                                    <has-error :form="form" field="password"></has-error>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input v-model="form.password" type="password" name="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                    <has-error :form="form" field="password"></has-error>
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <select v-model="form.type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                        <option value="admin">Administrator</option>
                                        <option value="user">User</option>
                                    </select>
                                    <has-error :form="form" field="type"></has-error>

                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Add User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                editmode : true,
                users : {},
                form: new Form({
                    name: "",
                    email: "",
                    password: "",
                    type: ""
                })
            }  
        },
        methods:{
            
            updateAction(user){
                console.log('Updatethis')
            },
            loadAction(){
                axios.get('api/user').then(({data}) => (this.users = data))
            },
            newAction(){
                this.form.clear();
                $('#addNewModal').modal('show');
            },
            createAction(){
                this.$Progress.start();
                this.form.post('api/user')

                .then(()=>{
                    Fire.$emit('AfterAction');

                    $('#addNewModal').modal('hide');

                    Toast.fire({
                        type: 'success',
                        title: 'Success',
                        text: this.form.name + 'successfully added'
                    })

                    this.$Progress.finish();
                })

                .catch(()=>{
                    
                    this.$Progress.fail();
                    Toast.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                        
                    })
                })

                
            },
            editAction(user){
                this.form.reset();
                $('#addNewModal').modal('show');
                this.form.fill(user);
            },
            deleteAction(id){
                Toast.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                    })
                .then((result) => {
                    
                    //Delete 
                    if (result.value) {
                        
                        this.$Progress.start();
                        this.form.delete('api/user/'+id)
                        .then(()=>{
                            Toast.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                            )
                            this.$Progress.finish();
                            Fire.$emit('AfterAction');
                        })
                        .catch(()=>{
                            
                            this.$Progress.fail();
                            Toast.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                                
                            })
                        })
                    }
                })
            }
        },
        mounted() {
            this.loadAction();
            Fire.$on('AfterAction',()=>{
                this.loadAction();
            });
            // setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
