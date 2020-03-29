import { container, ResourceApi } from '@quartz/core'

export class AccountApi extends ResourceApi {	
  
  /**	
   * Sign in	
   *	
   * @param {Object} params	
   *	
   * @return {Promise}	
   */	
  signIn (params) {	
    return this.post('/api/auth', params);	
  }	
  
  /**	
   * Request the provider access_token from code	
   *	
   * @param {string} provider_name	
   * @param {Object} params	
   *	
   * @return {Promise}	
   */	
  oauthProviderRequestToken (provider_name, params) {	
    return this.post('/oauth/' + provider_name + '/access_token', params).then(response => {	
      params.access_token = response.body.data.access_token;	
      return this.oauthProviderExchangeToken(provider_name, params);	
    });	
  }	
  
  /**	
   * Convert an external access_token to internal access_token	
   *	
   * @param {string} provider_name	
   * @param {Object} params	
   *	
   * @return {Promise}	
   */	
  oauthProviderExchangeToken (provider_name, params) {	
    return this.post('/oauth/' + provider_name + '/exchange_token', params)	
  }	
  
  /**	
   * Get user	
   *	
   * @param {String} user_id	
   *	
   * @return {Promise}	
   */	
  getUser (user_id) {
    return this.get(`/admin/users?query=id eq ${user_id}&include=groups`);	
  }	
};