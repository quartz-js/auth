import { container } from '@railken/quartz-core';

export default {

  auth (to, from, next) {
    next(container.get('user') ? true : {
      name: 'sign-in'
    });
  }
}
