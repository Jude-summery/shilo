export const dva = {
  config: {
    onError(e) {
      e.proventDefault();
      console.log(e.message);
    }
  },
  plugins: []
}
