export default {
  publicPath:  process.env.NODE_ENV === 'production'
    ? '/apps/pomodoro/'
    : '/'
}