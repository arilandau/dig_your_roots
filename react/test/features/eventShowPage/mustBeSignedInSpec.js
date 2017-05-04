describe('user visits an event page', () => {
  beforeEach(() => {
    stubGlobalFetch({
      '/api/v1/users/123/events':  { GET: ['getUserEventsSuccessResponse', 200] }
    });
  });

  it('must be signed in to view', () => {
    page = mountReactAppAt('/events/43');

    expect(page.text()).toMatch('Sign In');
    expect(page.text()).not.toMatch('Events');
  });

  it('can view when signed in', done => {
    let user = {
      "first_name": "bob", "last_name": "tester",
      "email": "bob@tester.com", "phone": "123-123-1234",
      "admin": false, "id": 123
    }
    Cookies.set('userData', user);
    page = mountReactAppAt('/events/43');
    setTimeout(() => {
      expect(page.text()).toMatch("Ceremony & Dinner");
      expect(page.text()).toMatch("Marathon, FL");
      done();
    }, 0)
  });
});
