import ForgeUI, { render, Fragment, Macro, useState, Image, Text, Strong, Link, MacroConfig, TextField, useConfig, RadioGroup, Radio } from "@forge/ui";
import { get_xkcd_image_url } from "./helpers/client";

const App = () => {
  const fallbackConfig = {
      selection: undefined,
      showTitle: 'no'
    };
  const config = useConfig() || fallbackConfig;
  console.log(`Current Config: ${config.toString()}`);
  const [data] = useState(async () => await get_xkcd_image_url(config.selection));

  if (config.showTitle == 'yes') {
      return (
        <Fragment>
            <Text><Link href={data.url}>{data.id}: <Strong>{data.alt}</Strong></Link></Text>
            <Image src={data.src} alt={data.alt}/>
        </Fragment>
      );
  };
  return (
    <Fragment>
        <Image src={data.src} alt={data.alt}/>
    </Fragment>
  );
};


const Configuration = () => {
    return (
        <MacroConfig>
            <RadioGroup label="Show Title" name="showTitle">
               <Radio value="yes" label="Yes" />
               <Radio defaultChecked value="no" label="No" />
            </RadioGroup>
            <TextField name="selection" label="Comic IDs to select from" description="Enter the IDs of the Comics you would like to see. You can specify multiple IDs and ranges of IDs like this: 1409-1412,1540,2170,560-590" placeholder="1409-1412,1540,2170,560-590"></TextField>
        </MacroConfig>
    );
};

export const run = render(
  <Macro
    app={<App />}
  />
);

export const configure = render(<Configuration/>);