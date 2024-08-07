// to shorten the address. We take only the first 5 and last 5 chars
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length-4)}`