interface ObjectType {
  "public-key": string;
  currency: string;
  "amount-in-cents": string;
  reference: string;
}

interface Props {
  amount: number;
  reference: string;
}

function wompi({ amount, reference }: Props) {
  const obj = {
    "public-key": `${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`,
    currency: "COP",
    "amount-in-cents": `${amount}00`,
    reference,
    "redirect-url": "http://localhost:3000/pagos/respuesta",
  };
  const form = document.createElement("form");
  form.method = "GET";
  form.action = "https://checkout.wompi.co/p/";
  Object.keys(obj).forEach((key) => {
    const input = document.createElement("input");
    input.setAttribute("name", key);
    input.setAttribute("value", obj[key as keyof ObjectType]);
    input.setAttribute("type", "hidden");
    form.appendChild(input);
  });
  document.body.appendChild(form);

  return form.submit();
}

export default wompi;
