<template>
    <div class='container full-height '>
        <div class='container-out'>
            <div class='paper content'>
                <logo :type="'bg'"></logo>
            </div>
            <div class='paper content container-out'>
        		<div v-if='loading'>
                    <div class='container-loader'>
                        <div class='sk-rotating-plane'></div>
                    </div>
                </div>
                <div v-if='!loading' class=''>
                    <div class='content'>
                        <div class='error text-error'>
                            {{ error }}
                        </div>
                        <br><br>
                        <router-link class='btn btn-primary' :to="{ name: 'sign-in'}">Back to sign in</router-link>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

import { container } from '@quartz/core'

export default {
  data () {
    return {
      loading: true,
      error: ''
    }
  },
  mounted () {
        	var provider = this.$route.params.provider
    self.loading = true
        	container.get('oauth').providerSignInCode(provider, this.$route.query).then(response => {
    			window.location.href = '/'
    		}).catch(error => {
      this.error = this.$t(error.body.code.toLowerCase())
      this.loading = false
        	})
  }
}

require('spinkit/css/spinners/1-rotating-plane.css')
</script>

<style scoped>

    .content {
        padding: 20px;
        background: white;
        margin: 10px;
    }

</style>
