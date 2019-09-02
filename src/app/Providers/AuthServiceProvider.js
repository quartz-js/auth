import { ServiceProvider } from '@quartz/core'
import { container, Helper } from '@quartz/core'
import { OAuth } from '../Services/OAuth'

export class AuthServiceProvider extends ServiceProvider {
  register() {

    container.set('oauth', new OAuth());

    this.addRoutes(null, require('./../../routes/auth.js'))

    this.addLang({
      'en': require('../../../lang/auth/en.json'),
      'it': require('../../../lang/auth/it.json')
    })
  }

  boot() {
    container.get('oauth').setHeader()

    return container.get('oauth').authenticate().then(response => {
      container.set('user', response.body.resource)
      window.user = container.get('user')
      return response
    }).catch((response) => {

      Helper.handleResponse(response)
      
      // Catch error
  
      return response    

    })
  }
}