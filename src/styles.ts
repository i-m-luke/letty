const colors = {
  primary: (opacity: number) => `rgba(255,255,255,${opacity})`,
};
Object.freeze(colors);

const classes = {
  mainPanel: `bg-[${colors.primary(0.5)}] p-4 rounded shadow-md backdrop-blur-lg`,
  thinBorderSize: "0.1rem",
};
Object.freeze(classes);

class GlobalStyles {
  private _color;
  private _class;
  constructor() {
    this._color = colors;
    this._class = classes;
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
