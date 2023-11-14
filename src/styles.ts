class GlobalStyles {
  private _color;
  private _class;
  constructor() {
    this._color = {
      primary: "bg-white",
    };
    Object.freeze(this._color);

    this._class = {};
    Object.freeze(this._class);
  }

  get color() {
    return this._color;
  }

  get class() {
    return this._class;
  }

  build(...args: string[]) {
    return args.join(" ");
  }
}

const styles: GlobalStyles = new GlobalStyles();

export default styles;
