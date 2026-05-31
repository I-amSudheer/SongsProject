package backend.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/payment") 
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKey;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @PostMapping("/create-order")
    public String createOrder() throws Exception {

        RazorpayClient client =
                new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject object = new JSONObject();

        object.put("amount", 1000); // 10 rupees
        object.put("currency", "INR");
        object.put("receipt", "txn_123456");

        Order order = client.orders.create(object);

        return order.toString();
    }
}