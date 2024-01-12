import { memo, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CustomSlider } from "../CustomSlider.jsx";
import { HorizontalStack } from "./HorizontalStack.jsx";
import CheckboxGrid from "../CheckBoxGrid/CheckboxGrid.jsx";
import { FancyButton } from "../FancyButton.jsx";
export const Controls = memo(
  ({
    sex,
    sexColors,
    income,
    setIncome,
    age,
    setAge,
    race,
    setRace,
    exclude,
    setExclude,
    fetchData,
    isLoading,
  }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));

    const raceCheckboxGrid = useMemo(
      () => (
        <CheckboxGrid
          items={Object.keys(race)}
          sex={sex}
          value={race}
          setValue={setRace}
        />
      ),
      [race, sex, setRace],
    );

    const excludeCheckboxGrid = useMemo(
      () => (
        <CheckboxGrid
          items={Object.keys(exclude)}
          sex={sex}
          value={exclude}
          setValue={setExclude}
        />
      ),
      [exclude, sex, setExclude],
    );

    const incomeSliderStyle = useMemo(
      () => ({
        marginRight: isSmallScreen ? "-6px" : "6px",
      }),
      [isSmallScreen],
    );

    const memoizedIncomeSlider = useMemo(
      () => (
        <CustomSlider
          sex={sex}
          sexColors={sexColors}
          value={income}
          setValue={setIncome}
          formatLabel={incomeLabel}
          min={0}
          max={500000}
          step={5000}
          style={incomeSliderStyle}
        />
      ),
      [sex, sexColors, income, setIncome, incomeSliderStyle],
    );

    const checkboxStyle = useMemo(
      () => ({
        color: "white", // Default color
        "&.Mui-checked": {
          color: "white", // Color when checked
        },
        "& .MuiSvgIcon-root": {
          // Target the icon specifically
          fill: "white", // Change fill for the checkmark icon
        },
      }),
      [],
    );

    function incomeLabel(value) {
      if (!value) {
        return "Any";
      }
      return `${value / 1000}k`;
    }

    return (
      <div className="flex flex-col gap-2">
        <HorizontalStack
          text="Age"
          component={
            <CustomSlider
              sex={sex}
              sexColors={sexColors}
              value={age}
              setValue={setAge}
              min={18}
              max={80}
              step={1}
            />
          }
        />

        <HorizontalStack
          text={income.isMax ? "Max Income" : "Min Income"}
          component={memoizedIncomeSlider}
          checkbox={true}
          setCheckboxValue={setIncome}
          value={income}
        />

        <HorizontalStack text="Race" component={raceCheckboxGrid} />

        <HorizontalStack text="Exclude" component={excludeCheckboxGrid} />
        <div className="sm:h-[6.63rem]">
          <FancyButton sex={sex} fetchData={fetchData} isLoading={isLoading} />
        </div>

        {/*<div className="flex items-center justify-center gap-5 rounded-xl bg-slate-400 bg-opacity-25 py-3 pl-4 pr-3 max-sm:gap-3 max-sm:py-1 max-sm:pl-3 max-sm:pr-2">*/}
        {/*  <span className=" flex-1  text-left  font-bold text-slate-50  max-sm:text-sm">*/}
        {/*    {income.isMax ? "Max Income" : "Min Income"}*/}
        {/*  </span>*/}
        {/*  <CustomSlider*/}
        {/*    sex={sex}*/}
        {/*    sexColors={sexColors}*/}
        {/*    value={income}*/}
        {/*    setValue={setIncome}*/}
        {/*    formatLabel={incomeLabel}*/}
        {/*    min={0}*/}
        {/*    max={500000}*/}
        {/*    step={5000}*/}
        {/*    style={useMemo(*/}
        {/*      () => ({*/}
        {/*        marginRight: isSmallScreen ? "3px" : "9px",*/}
        {/*      }),*/}
        {/*      [isSmallScreen],*/}
        {/*    )}*/}
        {/*  />*/}

        {/*  <Checkbox*/}
        {/*    checked={income.isMax}*/}
        {/*    onChange={(e) => setIncome({ ...income, isMax: e.target.checked })}*/}
        {/*    sx={checkboxStyle}*/}
        {/*    style={{ marginLeft: isSmallScreen ? "-10px" : "-20px" }}*/}
        {/*  />*/}
        {/*  <span className="-ml-6 text-sm text-slate-50 max-sm:-ml-5">Max</span>*/}
        {/*</div>*/}
      </div>
    );
  },
);