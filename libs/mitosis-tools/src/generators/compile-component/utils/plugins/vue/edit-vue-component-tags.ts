export const editVueComponentTags = (doc: string) => {
  doc = doc.replace(/stack-layout/g, 'StackLayout');
  doc = doc.replace(/flex-layout/g, 'FlexLayout');
  doc = doc.replace(/absolute-layout/g, 'AbsoluteLayout');
  doc = doc.replace(/wrap-layout/g, 'WrapLayout');
  doc = doc.replace(/root-layout/g, 'RootLayout');
  doc = doc.replace(/label/g, 'Label');

  doc = doc.replace(/export default {/, 'export default Vue.extend({');

  return doc;
};
