#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mouse;

mat2 scale(vec2 scale){
  return mat2(scale.x, 0.,0.,scale.y);
}
mat2 rotate(float angle){
  return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main(){
  vec2 coord = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0);
  vec2 translate = vec2(-0.5,-0.5);
  vec3 cl = vec3(0.2,0.2,0.2);
  coord+= translate;
  coord = rotate(u_time)*coord;
  
  coord = scale(vec2(sin(u_time)+3.))*coord;
  coord = scale(vec2(2.))*coord;
  
  float zn = 0.003+(sin(u_time)*2.+1.)*0.005/2.;
  for(int i =0; i<40;i++){
    float radius = 1.3;
    float rad = radians(360.0/3.)*float(i);  
    color.r+=0.008/length(coord+vec2(radius*cos(rad),
                                   radius*sin(rad)));
    color.b+=zn/length(coord+vec2(radius*cos(rad),
                                   radius*sin(rad)));
    
  }
  
  gl_FragColor = vec4(color,1.0);
}
