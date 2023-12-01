type Colors = {
  primary: (opacity: number) => string;
};
const colors: Readonly<Colors> = {
  primary: (opacity: number) => `rgba(255,255,255,${opacity})`,
};
Object.freeze(colors);

type Classes = {
  mainPanel: string;
  thinBorderSize: string;
};
const classes: Readonly<Classes> = {
  mainPanel: `bg-[rgba(255,255,255,0.3)] p-4 rounded shadow-md backdrop-blur-lg`,
  thinBorderSize: "0.1rem",
};
Object.freeze(classes);

class GlobalStyles {
  readonly color;
  readonly class;
  constructor() {
    this.color = colors;
    this.class = classes;
  }

  build(...args: string[]) {
    return args.join(" ");
  }
}

const styles: GlobalStyles = new GlobalStyles();

export default styles;
