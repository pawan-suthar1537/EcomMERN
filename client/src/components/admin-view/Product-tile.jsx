import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductsTile({
  product,
  setformdata,
  setcurrenteditpostid,
  setopencreateproductsheet,
}) {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              className="h-[300px] w-full object-cover rounded-t-lg"
              src={product?.image}
              alt={product?.title}
            />
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.saleprice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ₹ {product?.price}
              </span>
              {product?.saleprice > 0 && (
                <span className="text-lg font-semibold text-primary">
                  ₹ {product?.saleprice}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={() => {
                setopencreateproductsheet(true);
                setcurrenteditpostid(product?._id);
                setformdata(product);
              }}
            >
              <span className="mr-2">Edit</span>
            </Button>
            <Button>
              <span className="mr-2">Delete</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

export default AdminProductsTile;
