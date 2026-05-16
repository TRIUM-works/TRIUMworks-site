precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uClick; // xy = posição (0-1), z = intensidade (0-1, decai)

varying vec2 vUv;

// Cores da paleta
const vec3 COLOR_BASE = vec3(0.0666, 0.0784, 0.0941);   // #111418
const vec3 COLOR_BLUE = vec3(0.0510, 0.2313, 0.4000);   // #0D3B66
const vec3 COLOR_TEAL = vec3(0.0353, 0.7607, 0.6549);   // #09C2A7

// Hash / random
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Value noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 res = uResolution;
  float aspect = res.x / res.y;
  vec2 p = uv;
  p.x *= aspect;

  // Mouse com lerp já vem do JS
  vec2 m = uMouse;
  m.x *= aspect;

  // Tempo lento
  float t = uTime * 0.08;

  // Distortion baseada em mouse
  vec2 mouseDelta = p - m;
  float mouseDist = length(mouseDelta);
  vec2 mouseDistort = normalize(mouseDelta + 0.001) * exp(-mouseDist * 3.0) * 0.08;

  // Camada base de fbm (tinta dissolvendo)
  vec2 q = p * 1.5 + mouseDistort;
  q += vec2(fbm(q + t), fbm(q - t * 0.7)) * 0.6;
  float n1 = fbm(q + t * 0.4);

  // Segunda camada — detalhes finos
  vec2 q2 = p * 3.0 - mouseDistort * 2.0;
  float n2 = fbm(q2 + t * 0.6);

  // Respiração autônoma (sin lento)
  float breath = 0.5 + 0.5 * sin(uTime * 0.3);
  n1 = mix(n1, n1 * (0.8 + breath * 0.4), 0.4);

  // Onda radial do clique
  float clickDist = distance(p, vec2(uClick.x * aspect, uClick.y));
  float wave = sin(clickDist * 18.0 - uTime * 4.0) * 0.5 + 0.5;
  wave *= exp(-clickDist * 2.5) * uClick.z;
  n1 += wave * 0.5;

  // Mix de cores
  float blueAmount = smoothstep(0.35, 0.75, n1);
  float tealAmount = smoothstep(0.78, 0.95, n1 + n2 * 0.2);

  vec3 col = COLOR_BASE;
  col = mix(col, COLOR_BLUE, blueAmount * 0.85);
  col = mix(col, COLOR_TEAL, tealAmount * 0.5);

  // Vinheta sutil
  vec2 vUvC = uv - 0.5;
  float vignette = 1.0 - dot(vUvC, vUvC) * 0.9;
  col *= clamp(vignette, 0.55, 1.0);

  // Grain (~8%)
  float g = (hash(uv * res + uTime * 60.0) - 0.5) * 0.08;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
