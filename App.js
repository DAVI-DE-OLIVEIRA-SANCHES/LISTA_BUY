import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [produto, setProduto] = useState('');
  const [produtos, setProdutos] = useState([]);

  function adicionarProduto() {
    const nome = produto.trim();
    if (!nome) return;
    setProdutos((listaAtual) => [...listaAtual, nome]);
    setProduto('');
  }

  function removerProduto(indiceParaRemover) {
    setProdutos((listaAtual) => listaAtual.filter((_, indice) => indice !== indiceParaRemover));
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.emoji}>🛒</Text>
        <Text style={styles.title}>Minha lista de compras</Text>
        <Text style={styles.subtitle}>Organize o que você precisa comprar</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Digite um produto..."
            placeholderTextColor="#8B95A7"
            value={produto}
            onChangeText={setProduto}
            onSubmitEditing={adicionarProduto}
            returnKeyType="done"
            style={styles.input}
          />
          <Pressable onPress={adicionarProduto} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADICIONAR</Text>
          </Pressable>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <Text style={styles.counter}>{produtos.length}</Text>
        </View>
        <View style={styles.list}>
          {produtos.length === 0 ? <Text style={styles.emptyText}>Sua lista está vazia.</Text> : produtos.map((item, indice) => (
            <View style={styles.product} key={`${item}-${indice}`}>
              <Text style={styles.productName}>{item}</Text>
              <Pressable accessibilityLabel={`Remover ${item}`} onPress={() => removerProduto(indice)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#182230',
  },
  content: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', padding: 24, paddingTop: 72 },
  emoji: { fontSize: 38, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#AAB4C3', fontSize: 15, marginTop: 8, marginBottom: 28 },
  form: { gap: 10 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, color: '#182230', fontSize: 16, paddingHorizontal: 16, paddingVertical: 14 },
  addButton: { alignItems: 'center', backgroundColor: '#F6B73C', borderRadius: 12, paddingVertical: 15 },
  addButtonText: { color: '#182230', fontSize: 14, fontWeight: '800' },
  listHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 36, marginBottom: 12 },
  sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  counter: { backgroundColor: '#2D3A4D', borderRadius: 14, color: '#F6B73C', fontWeight: '800', minWidth: 30, overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 4, textAlign: 'center' },
  list: { gap: 10 },
  product: { alignItems: 'center', backgroundColor: '#243144', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', padding: 14 },
  productName: { color: '#FFFFFF', flex: 1, fontSize: 16 },
  removeButton: { alignItems: 'center', height: 32, justifyContent: 'center', width: 32 },
  removeButtonText: { color: '#F47C7C', fontSize: 28, fontWeight: '300', lineHeight: 30 },
  emptyText: { color: '#AAB4C3', fontSize: 15, paddingVertical: 12 },
});
