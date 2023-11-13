const colors = {
  primary: "bg-indigo-50",
};
Object.freeze(colors);

class GlobalStyles {
  private _colors;
  constructor() {
    this._colors = colors;
  }

  get colors() {
    return this._colors;
  }

  build(...args: string[]) {
    return args.join(" ");
  }
}

const styles: GlobalStyles = new GlobalStyles();

export default styles;
