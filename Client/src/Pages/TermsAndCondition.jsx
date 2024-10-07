import React from 'react'
import "./Terms.css"

const TermsAndCondition = () => {
  return (
    <div>
      <div>
        <div style={{height:"400px",position:"relative"}}>
           <img src='./SfG_images/Air.jpg' alt='terms' style={{width:"100%",height:"inherit",objectFit:"cover"}}></img>
           <div style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.7)",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}> <h3 style={{margin:"auto"}}>TERMS & CONDITIONS</h3></div>
        </div>
       
      </div>
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <section className="parent-element" >
            <h4 className='tabs'> Prohibition of Contraband Goods</h4>
            <h4 className='tabs'>Departure Timelines</h4>
            <h4 className='tabs'>Variability of Transit Times</h4>
            <h4 className='tabs'>Regulatory Inspections</h4>
            <h4 className='tabs'>Minimum Chargeable Volume </h4>
            <h4 className='tabs'>Measurement Verification</h4>
            <h4 className='tabs'>Warehouse Lien</h4>
            <h4 className='tabs'>Storage Charges </h4>
            <h4 className='tabs'>Limitation of Liability </h4>
            <h4 className='tabs'>Forklift Services</h4>
            <h4 className='tabs'>Weight-to-CBM Conversion</h4>
            <h4 className='tabs'>Payment for Air Shipments</h4>
            <h4 className='tabs'>Shipment of Special Items </h4>
      </section>

      <section className="terms">
        <p>Terms Of Service</p>
        <div>
          <h4> Prohibition of Contraband Goods</h4>
          
         <p>
            
            SF Ghana Logistics (SFGL) strictly prohibits the shipment of contraband or illegal goods. All 
            shipments are subject to rigorous security checks to ensure compliance with international laws 
            and regulations. In the event that any prohibited items are detected, SFGL reserves the right to 
            confiscate the goods and report the involved parties to the relevant authorities. It is the 
            responsibility of the shipper to ensure that all items comply with legal requirements prior to 
            shipping. 
         </p>
         </div>

         <div>
          <h4>Departure Timelines</h4>
         <p>
             
            Our departure schedules are determined by the availability of cargo and are subject to change 
            based on operational needs. While SFGL endeavors to adhere to published schedules, unforeseen 
            circumstances may lead to adjustments. Customers will be promptly notified of any changes to 
            departure timelines. 
         </p>
         </div>


        <div>
          <h4>Variability of Transit Times</h4>
         <p>
             
            Transit times provided by SFGL are estimates and may be influenced by external factors such as 
            weather conditions, regulatory inspections, and other unforeseen events. SFGL cannot guarantee 
            specific transit times, but we are committed to ensuring that shipments are delivered as promptly 
            as possible. Customers are encouraged to factor in potential delays when planning their 
            shipments. 
         </p>
         </div>

         <div>
          <h4>Regulatory Inspections</h4>
         <p>
             
            All cargo shipped through SFGL may be subject to inspections by customs and other regulatory 
            bodies as mandated by law. These inspections are conducted to ensure compliance with 
            international shipping regulations. SFGL will cooperate fully with regulatory authorities and 
            facilitate the inspection process, though this may occasionally lead to delays beyond our control.
         </p>
         </div>
        
        <div>
          <h4>Minimum Chargeable Volume </h4>
         <p>
            
            SFGL applies a minimum chargeable volume (CBM) of 0.02 CBM for all shipments. Shipments 
            with a volume below this threshold will be charged at the minimum rate. The chargeable volume 
            is calculated based on the greater of the actual or volumetric weight of the cargo.
         </p>
         </div>
        
        <div>
          <h4>Measurement Verification</h4>
         <p>
             
            To ensure accurate billing, all cargo measurements will be re-verified upon arrival at our 
            warehouse in Ghana. This re-verification process is conducted to confirm the actual cubic meter 
            (CBM) measurement before final payment is processed. Any discrepancies between the shipper’s 
            declared measurements and our verified measurements will be communicated to the customer. 
         </p>
         </div>

        <div>
          <h4>Warehouse Lien</h4>
         <p>
             
            SFGL retains a lien over all goods stored in our warehouse until all outstanding charges are 
            settled in full. Goods that remain uncollected or for which payment has not been made after a 30
            day moratorium period may be subject to auction. Proceeds from such auctions will be applied to 
            settle outstanding charges, with any surplus returned to the customer.
         </p>
         </div>

        <div>
          <h4>Storage Charges </h4>
         <p>
            
            Goods that remain in our warehouse for more than 4 days post-arrival will incur a storage charge 
            of GHS 20 per CBM per day. Customers are encouraged to collect their goods promptly to avoid 
            additional charges. Storage charges will accrue daily and must be paid in full before goods can 
            be released. 
         </p>
         </div>
        

        <div>
          <h4>Limitation of Liability </h4>
         <p>
            
            SFGL shall not be liable for any indirect, incidental, or consequential damages arising from the 
            use of our services. Our liability for any loss or damage to goods during transit or storage is 
            limited to the value declared by the customer at the time of shipment, subject to our standard 
            terms and conditions. 
         </p>
         </div>
        

        <div>
          <h4>Forklift Services</h4>
         <p>
             
            SFGL provides forklift services for handling goods over 200 kg. A charge of $12 will apply for 
            goods weighing between 200 kg and 2,000 kg. For goods exceeding 2,000 kg, the forklift service 
            charge will be $120. 
         </p>
         </div>


        <div>
          <h4>Weight-to-CBM Conversion</h4>
         <p>
             
            Goods weighing 700 kg will be considered equivalent to 1 CBM (Cubic Meter) for billing and 
            shipping purposes.
         </p>
         </div>
        

        <div>
          <h4>Payment for Air Shipments</h4>
         <p>
             
            For goods weighing over 5 kilograms and shipped via air, full payment is required in advance. 
            This policy ensures smooth processing and avoids delays in shipment. 
         </p>
         </div>
        

        <div>
          <h4>Shipment of Special Items </h4>
         <p>
            
            Special items such as batteries, liquids, and gases require prior confirmation before being sent to 
            our warehouse. Please contact SFGL to receive approval and ensure compliance with our safety 
            and regulatory protocols before shipping these goods. 
         </p>
         </div>
      </section>
      </div>
    </div>
  )
}

export default TermsAndCondition