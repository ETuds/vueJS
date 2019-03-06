<template>
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Users</h3>

                <div class="card-tools">
                    <button class="btn btn-success" data-toggle="modal" data-target="#addNewModal">Add User <i class="fas fa-user-plus"></i></button>
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
                                <a href="#" alt="Edit">
                                    <i class="list-action-icon fas fa-edit"></i>
                                </a>
                                <a href="#" alt="Delete">
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
                        <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
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
              users : {
              },

              form: new Form({
                  name: "",
                  email: "",
                  password: ""
              })
          }  
        },
        methods:{
            
            loadUsers(){
                axios.get('api/user').then(({data}) => (this.users = data))
            },
            createUser(){
                this.form.post('api/user')
            }
        },
        mounted() {
            this.loadUsers()
        }
    }
</script>
