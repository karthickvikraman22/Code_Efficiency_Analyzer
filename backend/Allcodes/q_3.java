public class q_3 {
    public static boolean Prime_number(int n){
       // Enter your code here
       for(int i=2;i<=n/2;i++){
          if(n%i==0){
            return false;
          }
       }
       return true;
    }
    

    public static void main(String[] args) {
        try {
            int n = Integer.parseInt(args[0]);
            System.out.print(Prime_number(n)); 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please provide a valid integer.");
        }
    }
}