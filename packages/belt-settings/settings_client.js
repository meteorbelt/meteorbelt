if (typeof __meteor_runtime_config__ !== 'undefined' &&
    __meteor_runtime_config__ &&
    __meteor_runtime_config__.BELT_PUBLIC_SETTINGS) {
  Belt.settings = { public: __meteor_runtime_config__.BELT_PUBLIC_SETTINGS };
}
