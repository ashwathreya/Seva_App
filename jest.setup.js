jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn((_opts, cb) => {
    if (typeof cb === 'function') {
      cb({ didCancel: true });
    }
  }),
}));
