const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_yJveD0iN90MVSXqGANsjqzsN'
    : 'pk_test_yJveD0iN90MVSXqGANsjqzsN'

export default STRIPE_PUBLISHABLE
