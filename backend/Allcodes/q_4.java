

public class q_4 {
    public static String Odd_or_Even(int n){
       // Enter your code here
       if(n%2==0){
        return "even";
       }
       else{
        return "odd";
       }
    }
    

    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(Odd_or_Even(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}