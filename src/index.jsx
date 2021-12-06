import ForgeUI, { render, Fragment, Macro, useState, Image } from "@forge/ui";
import { get_random_xkcd_url } from "./helpers/client";

const App = () => {
  const [src] = useState(async () => await get_random_xkcd_url());
  return (
    <Fragment>
       <Image
        src={src}
      />
    </Fragment>
  );
};

export const run = render(
  <Macro
    app={<App />}
  />
);
