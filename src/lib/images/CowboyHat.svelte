<script>
  export let size = 40;
  export let color = "#8B4513";
</script>

<svg 
  width={size} 
  height={size} 
  viewBox="0 0 300 300" 
  fill="none" 
  xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
  class="flex items-center"
>
  <!-- Outer Brim (Shadow/Depth) -->
  <path d="M20 130C20 145 55.8172 160 100 160C144.183 160 180 145 180 130C180 115 144.183 110 100 110C55.8172 110 20 115 20 130Z" fill="#5D2E0C"/>

  <!-- Hat Brim -->
  <path d="M20 125C20 140 55.8172 155 100 155C144.183 155 180 140 180 125C180 110 144.183 105 100 105C55.8172 105 20 110 20 125Z" fill={color}/>

  <!-- Hat Crown -->
  <path d="M60 115C60 115 55 60 100 60C145 60 140 115 140 115" fill="#A0522D" stroke="#5D2E0C" stroke-width="2"/>

  <!-- The Crease (Top of Hat) -->
  <path d="M85 65C95 75 105 75 115 65" stroke="#5D2E0C" stroke-width="3" stroke-linecap="round"/>

  <!-- Hat Band -->
  <path d="M60 105C60 105 65 115 100 115C135 115 140 105 140 105L142 115C142 115 135 125 100 125C65 125 58 115 58 115L60 105Z" fill="#3D1F08"/>

  <!-- Small Highlight -->
  <path d="M75 80C75 80 78 70 85 70" stroke="white" stroke-opacity="0.1" stroke-width="4" stroke-linecap="round"/>
</svg>
