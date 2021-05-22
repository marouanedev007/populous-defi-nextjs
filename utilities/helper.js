import millify from "millify";

import assetImg from "../public/images/Assets.png";
import daiImg from "../public/images/tokens/dai.png";
import usdcImg from "../public/images/tokens/usdc.png";
import tusdImg from "../public/images/tokens/tusd.png";
import pptImg from "../public/images/tokens/ppt.png";
import pxtImg from "../public/images/tokens/pxt.png";
import usdtImg from "../public/images/tokens/usdt.png";
import ethImg from "../public/images/tokens/eth.png";
import wbtcImg from "../public/images/tokens/wbtc.png";
import paxImg from "../public/images/tokens/pax.png";
import pDaiImg from "../public/images/tokens/pdai.svg";
import pUsdcImg from "../public/images/tokens/pusdc.svg";
import pTusdImg from "../public/images/tokens/ptusd.svg";

export const tokenSymbol = (name) => {
  let icon;
  switch (name) {
    case "DAI": {
      icon = daiImg;
      break;
    }
    case "TUSD": {
      icon = tusdImg;
      break;
    }
    case "USDC": {
      icon = usdcImg;
      break;
    }
    case "PAX": {
      icon = paxImg;
      break;
    }
    case "PPT": {
      icon = pptImg;
      break;
    }
    case "PXT": {
      icon = pxtImg;
      break;
    }
    case "ETH": {
      icon = ethImg;
      break;
    }
    case "WBTC": {
      icon = wbtcImg;
      break;
    }
    case "PDAI": {
      icon = pDaiImg;
      break;
    }
    case "PTUSD": {
      icon = pTusdImg;
      break;
    }
    case "PUSDC": {
      icon = pUsdcImg;
      break;
    }
    case "USDT": {
      icon = usdtImg;
      break;
    }
    default:
      icon = assetImg;
  }
  return icon;
};

export function beautyNumber(number) {
  if (isNaN(Number(number))) {
    return "0";
  }
  return millify(Number(number), {
    precision: 2,
    decimalSeparator: ".",
  });
}

export function beautyNumberDecimal(number) {
  if (isNaN(Number(number))) {
    return "0";
  }
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function make2decimal(number) {
  if (isNaN(Number(number))) {
    return 0;
  }
  number = number.toString(); //If it's not already a String
  number = number.slice(0, number.indexOf(".") + 3); //With 3 exposing the hundredths place
  return Number(number);
}

export function parseDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()] + " " + date.getDate();
}

export const formattedNumber = (
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) => {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

export const timestampToDateTime = (timestamp) => {
  const d = new Date(timestamp);
  const date_format_str =
    d.getFullYear().toString() +
    "-" +
    ((d.getMonth() + 1).toString().length == 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "-" +
    (d.getDate().toString().length == 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    " " +
    (d.getHours().toString().length == 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
      ? (parseInt(d.getMinutes() / 5) * 5).toString()
      : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
    ":00";

  return date_format_str;
};
