import { Slug } from './slug'

test('it should be able to create a slug from a text', async () => {
  const slug = Slug.createFromText('An Test title ')

  expect(slug.value).toEqual('an-test-title')
})
