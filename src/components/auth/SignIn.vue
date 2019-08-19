<template>
  <v-app style='background: white'>
    <div class='container'>
      <div>  
        <!--<div class='logo'><img class='logo-img' src='../assets/logo.png'></div>-->
        <div class="centered-container">
          <q-card flat style='margin-top: -180px'>
            <div class="title">
              <h1>{{ $root.config.app.name }}</h1>
            </div>
            <div class="md-body-1" v-if="!error">
              Welcome back!<br>
              Please login to your account.
            </div>
            <v-alert type="error" :value="error">
              {{ error }}
            </v-alert>
            <div class="form mt-4">
                <v-text-field
                  prepend-icon="person"
                  v-model="form.username"
                  label="Username"
                  primary
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  v-model="form.password"
                  label="Password"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                  :append-icon="show3 ? 'visibility_off' : 'visibility'"
                ></v-text-field>
            </div>

            <div class="actions fluid">
              <div class='fill'></div>
              <v-btn color="primary" @click="login()">Log in</v-btn>
            </div>

            <div class="loading-overlay" v-if="loading">
              <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
          </q-card>

        </div>
      </div>
      <div class='bg'><img :src='require("../../assets/welcome.png")'></div>
    </div>
</v-app>
</template>

<script>

// require('@quartz/basic/src/assets/styles/default.styl')

import { container } from '@quartz/core'

export default {
  name: 'SignIn',
  data () {
    return {
      nav: false,
      form: {},
      show3: false,
      loading: false,
      error: null
    }
  },
  methods: {

    providerEnabled (provider) {
      return container.get('oauth').getProviderByName('github').isEnabled()
    },
    login (provider) {
      if (provider) {
        container.get('oauth').providerSignIn(provider)
      } else {
        container.get('oauth').signIn(this.form).then(response => {
          window.location.href = '/'
        }).catch(response => {
          this.error = response.body.errors.message
        })
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 0;
  margin: 0;
  height:auto;
  overflow:hidden;
  max-width: 100%;
  text-align: left
}

.md-body-1 {
  font-size: 14px;
  opacity: 0.8
}

.container > div{
  flex-grow: 1
}
.container > div.bg{
  width: 50%;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center
}
.container > div.bg img{
  width: 100%;
  max-width: 600px
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100vh;
  .title {
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 220px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .q-card{
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 600px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.title {
  text-align: left;
}

h1 {
  font-weight: 100
}

.logo {
  margin: 25px 0 0 20px;
  width: auto;
  text-align: left !important
}
.logo img {
  max-height: 60px
}
</style>
